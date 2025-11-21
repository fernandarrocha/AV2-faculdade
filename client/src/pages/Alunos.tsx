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
import { Plus, Pencil, Trash2, UserPlus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Aluno {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  cursos?: Curso[];
}

interface Curso {
  id: number;
  nome: string;
  cargaHoraria: number;
}

export default function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [matriculaDialogOpen, setMatriculaDialogOpen] = useState(false);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [selectedAlunoForMatricula, setSelectedAlunoForMatricula] = useState<Aluno | null>(null);
  const [selectedCursoId, setSelectedCursoId] = useState<string>('');
  const { getAuthHeader } = useAuth();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    matricula: '',
  });

  const API_BASE = 'http://localhost:8080/api';

  useEffect(() => {
    fetchAlunos();
    fetchCursos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await fetch(`${API_BASE}/alunos`, {
        headers: {
          Authorization: getAuthHeader(),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAlunos(data);
      } else {
        toast.error('Erro ao carregar alunos');
      }
    } catch (error) {
      toast.error('Erro de conexão com o backend');
    } finally {
      setLoading(false);
    }
  };

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
      }
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingAluno
        ? `${API_BASE}/alunos/${editingAluno.id}`
        : `${API_BASE}/alunos`;

      const method = editingAluno ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          editingAluno ? 'Aluno atualizado com sucesso!' : 'Aluno criado com sucesso!'
        );
        setDialogOpen(false);
        resetForm();
        fetchAlunos();
      } else {
        toast.error('Erro ao salvar aluno');
      }
    } catch (error) {
      toast.error('Erro de conexão');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este aluno?')) return;

    try {
      const response = await fetch(`${API_BASE}/alunos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: getAuthHeader(),
        },
      });

      if (response.ok) {
        toast.success('Aluno excluído com sucesso!');
        fetchAlunos();
      } else {
        toast.error('Erro ao excluir aluno');
      }
    } catch (error) {
      toast.error('Erro de conexão');
    }
  };

  const handleMatricular = async () => {
    if (!selectedAlunoForMatricula || !selectedCursoId) {
      toast.error('Selecione um curso');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/alunos/${selectedAlunoForMatricula.id}/matricular/${selectedCursoId}`,
        {
          method: 'POST',
          headers: {
            Authorization: getAuthHeader(),
          },
        }
      );

      if (response.ok) {
        toast.success('Aluno matriculado com sucesso!');
        setMatriculaDialogOpen(false);
        setSelectedCursoId('');
        fetchAlunos();
      } else {
        toast.error('Erro ao matricular aluno');
      }
    } catch (error) {
      toast.error('Erro de conexão');
    }
  };

  const openEditDialog = (aluno: Aluno) => {
    setEditingAluno(aluno);
    setFormData({
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula,
    });
    setDialogOpen(true);
  };

  const openMatriculaDialog = (aluno: Aluno) => {
    setSelectedAlunoForMatricula(aluno);
    setSelectedCursoId('');
    setMatriculaDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ nome: '', email: '', matricula: '' });
    setEditingAluno(null);
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
            <h2 className="text-3xl font-bold text-foreground">Alunos</h2>
            <p className="text-muted-foreground mt-1">
              Gerencie os alunos cadastrados no sistema
            </p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Aluno
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Alunos</CardTitle>
            <CardDescription>
              {alunos.length} {alunos.length === 1 ? 'aluno cadastrado' : 'alunos cadastrados'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Carregando...</p>
            ) : alunos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum aluno cadastrado
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Cursos</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alunos.map((aluno) => (
                    <TableRow key={aluno.id}>
                      <TableCell className="font-mono">{aluno.matricula}</TableCell>
                      <TableCell className="font-medium">{aluno.nome}</TableCell>
                      <TableCell>{aluno.email}</TableCell>
                      <TableCell>
                        {aluno.cursos && aluno.cursos.length > 0
                          ? aluno.cursos.map((c) => c.nome).join(', ')
                          : 'Nenhum'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openMatriculaDialog(aluno)}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(aluno)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(aluno.id)}
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

        {/* Dialog para criar/editar aluno */}
        <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAluno ? 'Editar Aluno' : 'Novo Aluno'}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do aluno abaixo
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="matricula">Matrícula</Label>
                  <Input
                    id="matricula"
                    value={formData.matricula}
                    onChange={(e) =>
                      setFormData({ ...formData, matricula: e.target.value })
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
                  {editingAluno ? 'Atualizar' : 'Criar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog para matricular aluno em curso */}
        <Dialog open={matriculaDialogOpen} onOpenChange={setMatriculaDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Matricular Aluno em Curso</DialogTitle>
              <DialogDescription>
                Selecione o curso para matricular {selectedAlunoForMatricula?.nome}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="curso">Curso</Label>
              <Select value={selectedCursoId} onValueChange={setSelectedCursoId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um curso" />
                </SelectTrigger>
                <SelectContent>
                  {cursos.map((curso) => (
                    <SelectItem key={curso.id} value={curso.id.toString()}>
                      {curso.nome} ({curso.cargaHoraria}h)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setMatriculaDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleMatricular}>Matricular</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
