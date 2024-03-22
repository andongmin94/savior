package kr.ac.baekgoo.springboot.repository.user;

import kr.ac.baekgoo.springboot.domain.user.Selectfamily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelectFamilyRepository extends JpaRepository<Selectfamily, Long> {
    List<Selectfamily> findByUser_UserSeq(Long userSeq);
    void deleteAllByUser_UserSeq(Long userSeq);
}
