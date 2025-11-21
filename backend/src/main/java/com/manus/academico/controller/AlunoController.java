package com.manus.academico.controller;

import com.manus.academico.model.Aluno;
import com.manus.academico.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public List<Aluno> getAllAlunos() {
        return alunoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> getAlunoById(@PathVariable Long id) {
        return alunoService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Aluno createAluno(@RequestBody Aluno aluno) {
        return alunoService.save(aluno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable Long id, @RequestBody Aluno alunoDetails) {
        return alunoService.findById(id)
                .map(aluno -> {
                    aluno.setNome(alunoDetails.getNome());
                    aluno.setEmail(alunoDetails.getEmail());
                    aluno.setMatricula(alunoDetails.getMatricula());
                    // Não atualiza a lista de cursos diretamente aqui
                    return ResponseEntity.ok(alunoService.save(aluno));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable Long id) {
        if (alunoService.findById(id).isPresent()) {
            alunoService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint para matricular o aluno em um curso
    @PostMapping("/{alunoId}/matricular/{cursoId}")
    public ResponseEntity<Aluno> matricularEmCurso(@PathVariable Long alunoId, @PathVariable Long cursoId) {
        return alunoService.matricularEmCurso(alunoId, cursoId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build()); // Retorna 400 se aluno ou curso não for encontrado
    }

    // Endpoint para desmatricular o aluno de um curso
    @DeleteMapping("/{alunoId}/desmatricular/{cursoId}")
    public ResponseEntity<Aluno> desmatricularDeCurso(@PathVariable Long alunoId, @PathVariable Long cursoId) {
        return alunoService.desmatricularDeCurso(alunoId, cursoId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build()); // Retorna 400 se aluno ou curso não for encontrado
    }
}
