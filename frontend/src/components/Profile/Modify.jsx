import AgeSelectBox from '@/components/Profile/AgeRange';
import GenderSelectBox from '@/components/Profile/Gender';

export default function ModifyProfile({ ageRange, setAgeRange, gender, setGender }) {
  return (
    <div>
      <h6>
        <b>연령대: </b>

        <AgeSelectBox ageRange={ageRange} setAgeRange={setAgeRange}></AgeSelectBox>
      </h6>

      <h6>
        <b>성별:　</b>
        <GenderSelectBox gender={gender} setGender={setGender}></GenderSelectBox>
      </h6>
    </div>
  );
};