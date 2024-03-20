package kr.ac.baekgoo.springboot.repository;

import kr.ac.baekgoo.springboot.entity.Welfare;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

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

        return em.createQuery("select w.welfareId, w.welfare_service_name, w.welfare_view from Welfare w where w.welfare_service_name like concat('%', :keyword, '%')")
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

    public List<Welfare> getGroupWelfare(Long group_id) {
        return em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by w.usedwelfares.size desc", Welfare.class)
                .setParameter("group_id", group_id)
                .getResultList();
    }

    public List<Welfare> getGroupPopularWelfare(Long group_id) {
        List<Welfare> welfares = em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by w.welfare_view desc" , Welfare.class)
                .setParameter("group_id", group_id)
                .getResultList();
        if (welfares.size() < 10) {
            return welfares;
        } else {
            return welfares.subList(0, 10);
        }
//        return em.createQuery("select w from Welfare w where w.welfare_group = :group_id order by w.welfare_view desc" , Welfare.class)
//                .setParameter("group_id", group_id)
//                .getResultList().subList(0, 10);
    }

    public List<Welfare> getMostUserWelfare() {
        List<Welfare> resultList = em.createQuery("select w from Welfare w order by w.usedwelfares.size desc", Welfare.class)
                .getResultList();
        return resultList.subList(0, 10);
    }
}
