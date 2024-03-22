package kr.ac.baekgoo.springboot.repository.welfare;

import kr.ac.baekgoo.springboot.domain.Target;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TargetRepository extends JpaRepository<Target, Long> {
    Target findByTargetId(Long targetId);
}
