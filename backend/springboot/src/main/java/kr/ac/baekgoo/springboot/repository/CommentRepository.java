package kr.ac.baekgoo.springboot.repository;

import kr.ac.baekgoo.springboot.domain.Comment;
import kr.ac.baekgoo.springboot.domain.Qna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;

@EnableJpaRepositories
public interface CommentRepository extends JpaRepository<Comment,Long> {

}
