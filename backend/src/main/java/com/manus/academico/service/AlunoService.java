package com.manus.academico.service;

import com.manus.academico.model.Aluno;
import com.manus.academico.model.Curso;
import com.manus.academico.repository.AlunoRepository;
import com.manus.academico.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    public Optional<Aluno> findById(Long id) {
        return alunoRepository.findById(id);
    }

    public Aluno save(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    public void deleteById(Long id) {
        alunoRepository.deleteById(id);
    }

    @Transactional
    public Optional<Aluno> matricularEmCurso(Long alunoId, Long cursoId) {
        Optional<Aluno> alunoOpt = alunoRepository.findById(alunoId);
        Optional<Curso> cursoOpt = cursoRepository.findById(cursoId);

        if (alunoOpt.isPresent() && cursoOpt.isPresent()) {
            Aluno aluno = alunoOpt.get();
            Curso curso = cursoOpt.get();
            aluno.adicionarCurso(curso);
            return Optional.of(alunoRepository.save(aluno));
        }
        return Optional.empty();
    }

    @Transactional
    public Optional<Aluno> desmatricularDeCurso(Long alunoId, Long cursoId) {
        Optional<Aluno> alunoOpt = alunoRepository.findById(alunoId);
        Optional<Curso> cursoOpt = cursoRepository.findById(cursoId);

        if (alunoOpt.isPresent() && cursoOpt.isPresent()) {
            Aluno aluno = alunoOpt.get();
            Curso curso = cursoOpt.get();
            aluno.removerCurso(curso);
            return Optional.of(alunoRepository.save(aluno));
        }
        return Optional.empty();
    }
}
