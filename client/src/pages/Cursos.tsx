import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Curso {
  id: number;
  nome: string;
  cargaHoraria: number;
  alunos?: Aluno[];
}

interface Aluno {
  id: number;
  nome: string;
  email: string;
  matricula: string;
}

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null);
  const { getAuthHeader } = useAuth();

  const [formData, setFormData] = useState({
    nome: '',
    cargaHoraria: '',
  });

  const API_BASE = 'http://localhost:8080/api';

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await fetch(`${API_BASE}/cursos`, {
        headers: {
          Authorization: getAuthHeader(),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCursos(data);
      } else {
        toast.error('Erro ao carregar cursos');
      }
    } catch (error) {
      toast.error('Erro de conexão com o backend');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCurso
        ? `${API_BASE}/cursos/${editingCurso.id}`
        : `${API_BASE}/cursos`;

      const method = editingCurso ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify({
          nome: formData.nome,
          cargaHoraria: parseInt(formData.cargaHoraria),
        }),
      });

      if (response.ok) {
        toast.success(
          editingCurso ? 'Curso atualizado com sucesso!' : 'Curso criado com sucesso!'
        );
        setDialogOpen(false);
        resetForm();
        fetchCursos();
      } else {
        toast.error('Erro ao salvar curso');
      }
    } catch (error) {
      toast.error('Erro de conexão');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este curso?')) return;

    try {
      const response = await fetch(`${API_BASE}/cursos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: getAuthHeader(),
        },
      });

      if (response.ok) {
        toast.success('Curso excluído com sucesso!');
        fetchCursos();
      } else {
        toast.error('Erro ao excluir curso');
      }
    } catch (error) {
      toast.error('Erro de conexão');
    }
  };

  const openEditDialog = (curso: Curso) => {
    setEditingCurso(curso);
    setFormData({
      nome: curso.nome,
      cargaHoraria: curso.cargaHoraria.toString(),
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ nome: '', cargaHoraria: '' });
    setEditingCurso(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetForm();
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Cursos</h2>
            <p className="text-muted-foreground mt-1">
              Gerencie os cursos disponíveis no sistema
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Cursos</CardTitle>
            <CardDescription>
              {cursos.length} {cursos.length === 1 ? 'curso cadastrado' : 'cursos cadastrados'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Carregando...</p>
            ) : cursos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum curso cadastrado
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Carga Horária</TableHead>
                    <TableHead>Alunos Matriculados</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cursos.map((curso) => (
                    <TableRow key={curso.id}>
                      <TableCell className="font-medium">{curso.nome}</TableCell>
                      <TableCell>{curso.cargaHoraria}h</TableCell>
                      <TableCell>
                        {curso.alunos ? curso.alunos.length : 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(curso)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(curso.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Dialog para criar/editar curso */}
        <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCurso ? 'Editar Curso' : 'Novo Curso'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do curso abaixo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Curso</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargaHoraria">Carga Horária (horas)</Label>
                  <Input
                    id="cargaHoraria"
                    type="number"
                    min="1"
                    value={formData.cargaHoraria}
                    onChange={(e) =>
                      setFormData({ ...formData, cargaHoraria: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingCurso ? 'Atualizar' : 'Criar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
