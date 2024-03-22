package kr.ac.baekgoo.springboot.service;

import jakarta.transaction.Transactional;
import kr.ac.baekgoo.springboot.domain.dto.CharacterDto;
import kr.ac.baekgoo.springboot.domain.dto.ProfileDto;
import kr.ac.baekgoo.springboot.domain.user.*;
import kr.ac.baekgoo.springboot.repository.user.*;
import kr.ac.baekgoo.springboot.repository.welfare.FamilyRepository;
import kr.ac.baekgoo.springboot.repository.welfare.TargetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UsedwelfareRepository userUsedRepository;
    private final LikeWelfareRepository likeWelfareRepository;
    private final SelectFamilyRepository selectFamilyRepository;
    private final SelectTargetRepository selectTargetRepository;
    private final TargetRepository targetRepository;
    private final FamilyRepository familyRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    public List<Usedwelfare> getUsed(User userSeq){
        List<Usedwelfare> li = userUsedRepository.findByUser_UserSeq(userSeq.getUserSeq());
        return li;
    }

    public List<Usedwelfare> getAllUsedList(){
        List<Usedwelfare> li = userUsedRepository.findAll();
        return li;
    }

    public void setUserUsedRepository(Usedwelfare used){
        userUsedRepository.save(used);
    }

    @Transactional
    public void deleteUserUsedRepository(Usedwelfare used){
        userUsedRepository.deleteByUser_UserSeqAndWelfare_WelfareId(used.getUser().getUserSeq(),used.getWelfare().getWelfareId());
    }

    public List<Likewelfare> getLike(User user){
        List<Likewelfare> li = likeWelfareRepository.findByUser_UserSeq(user.getUserSeq());
        return li;
    }

    public List<Likewelfare> getAllLikeList(){
        List<Likewelfare> li = likeWelfareRepository.findAll();
        return li;
    }

    public void setLikeRepository(Likewelfare like){
        likeWelfareRepository.save(like);
    }

    @Transactional
    public void deleteLikeRepository(Likewelfare like){
        likeWelfareRepository.deleteByUser_UserSeqAndWelfare_WelfareId(like.getUser().getUserSeq(), like.getWelfare().getWelfareId());
    }

    @Transactional
    public void updateUserCharacter(CharacterDto dto, String userId){
        User user = getUser(userId);
        user.setChild(dto.getChild());
        userRepository.save(user);
        selectTargetRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        selectFamilyRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        Selecttarget selecttarget;
        Selectfamily selectfamily;
        for(int i=0;i<dto.getJob().size();i++){
            selecttarget = new Selecttarget();
            selecttarget.setUser(user);
            selecttarget.setTarget(targetRepository.findByTargetId(dto.getJob().get(i)));
            selectTargetRepository.save(selecttarget);
        }
        for(int i=0;i<dto.getFamily().size();i++){
            selectfamily = new Selectfamily();
            selectfamily.setUser(user);
            selectfamily.setFamily(familyRepository.findByFamilyId(dto.getFamily().get(i)));
            selectFamilyRepository.save(selectfamily);
        }
    }

    public List<Long> getAllSelectFamily(Long userSeq){
        List<Selectfamily> li =  selectFamilyRepository.findByUser_UserSeq(userSeq);
        List<Long> res = new ArrayList<>();
        for(Selectfamily i : li){
            res.add(i.getFamily().getFamilyId());
        }
        return res;
    }

    public List<Long> getAllSelectTarget(Long userSeq){
        List<Selecttarget> li =  selectTargetRepository.findByUser_UserSeq(userSeq);
        List<Long> res = new ArrayList<>();
        for(Selecttarget i : li){
            res.add(i.getTarget().getTargetId());
        }
        return res;
    }

    public void updateUserProfile(ProfileDto dto, String userId){
        User user = getUser(userId);
        user.setAgeRange(dto.getAge());
        if(dto.getGender().equals("male")){
            user.setMale(1L);
            user.setFemale(0L);
        }
        else{
            user.setMale(0L);
            user.setFemale(1L);
        }
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(String userId){
        User user = getUser(userId);
        selectTargetRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        selectFamilyRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        userUsedRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        likeWelfareRepository.deleteAllByUser_UserSeq(user.getUserSeq());
        userRepository.delete(user);
    }
}
