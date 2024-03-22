package kr.ac.baekgoo.springboot.repository.user;

import kr.ac.baekgoo.springboot.domain.user.Selecttarget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelectTargetRepository extends JpaRepository<Selecttarget, Long> {
    List<Selecttarget> findByUser_UserSeq(Long userSeq);
    void deleteAllByUser_UserSeq(Long userSeq);
}

