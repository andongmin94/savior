package kr.ac.baekgoo.springboot.repository.user;

import kr.ac.baekgoo.springboot.domain.user.Usedwelfare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsedwelfareRepository extends JpaRepository<Usedwelfare, Long> {
    List<Usedwelfare> findByUser_UserSeq(Long userSeq);
    List<Usedwelfare> findAll();
    void deleteByUser_UserSeqAndWelfare_WelfareId(Long userSeq, Long welfareId);
    void deleteAllByUser_UserSeq(Long userSeq);
}
