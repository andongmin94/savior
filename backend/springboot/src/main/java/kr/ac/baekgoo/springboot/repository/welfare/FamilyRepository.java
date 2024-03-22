package kr.ac.baekgoo.springboot.repository.welfare;

import kr.ac.baekgoo.springboot.domain.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {
    Family findByFamilyId(Long familyId);
}
