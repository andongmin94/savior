package kr.ac.baekgoo.springboot.repository.welfare;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import kr.ac.baekgoo.springboot.domain.welfare.Welfare;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Log4j2
@Repository
public class WelfareRepository {

    @PersistenceContext
    private EntityManager em;

    public Welfare findByWelfareId(Long id) {
        Welfare welfare = em.find(Welfare.class, id);
        welfare.setWelfare_view(welfare.getWelfare_view() + 1);
        return welfare;
    }

    public List<Welfare> findAllWelfare() {
        return em.createQuery("select w from Welfare w", Welfare.class)
                .getResultList();
    }

    public List searchWelfare(String keyword) {

        return em.createQuery("select w.welfareId, w.welfare_service_name, w.welfare_view from Welfare w where w.welfare_service_name like concat('%', :keyword, '%') order by w.welfare_view desc")
                .setParameter("keyword", keyword)
                .getResultList();
    }

    public List getSimilar(Long id) {
        String similar_words = em.find(Welfare.class, id).getWelfare_similarwelfare().replace("[", "").replace("]", "");

        String[] sim_words = similar_words.split(", ");
        List<Long> similars = new ArrayList<>(10);

        for (int i = 0; i < sim_words.length; i ++) {
            similars.add(Long.valueOf(sim_words[i]));
        }

        return em.createQuery("select w.welfareId, w.welfare_service_name, w.welfare_service_content from Welfare w where w.welfareId in :similars ")
                .setParameter("similars", similars)
                .getResultList();
    }

//    public List<Welfare> getGroupWelfare(Long group_id) {
////        return em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by w.usedwelfares.size desc", Welfare.class)
////                .setParameter("group_id", group_id)
////                .getResultList();
//        return em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by element(w.usedwelfares).id desc", Welfare.class)
//                .setParameter("group_id", group_id)
//                .getResultList();
//    }
    public List<Welfare> getGroupWelfare(Long group_id) {
        try {
            System.out.println("WelfareRepository.getGroupWelfare success");
            List<Welfare> query_result = em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by w.usedwelfares.size desc", Welfare.class)
                .setParameter("group_id", group_id)
                .getResultList();
            return query_result;
        } catch (PersistenceException e) {
            log.info("PersistenceException");
            log.error(e);
            return Collections.emptyList();
        } catch (Exception e) {
            log.info("getGroupWelfare Exception");
            log.error(e);

            List<Welfare> query_result = em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by w.id desc", Welfare.class)
                    .setParameter("group_id", group_id)
                    .getResultList();
            return query_result;
        }
    }


    // 유저 그룹에 의한 인기(조회) 순
    public List<Welfare> getGroupPopularWelfare(Long group_id) {
        List<Welfare> welfares = em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by w.welfare_view desc" , Welfare.class)
                .setParameter("group_id", group_id)
                .getResultList();
        if (welfares.size() < 10) {
            return welfares;
        } else {
            return welfares.subList(0, 10);
        }
    }

    // 모든 유저에 있어서의 인기(조회) 순
    public List<Welfare> getMostUserWelfare() {
        List<Welfare> resultList = em.createQuery("select w from Welfare w order by w.welfare_view desc", Welfare.class)
                .getResultList();
        return resultList.subList(0, 10);
    }
}
