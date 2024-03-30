export default function ProfileCard(props) {
  return (
    <div className="box-border gird rounded-[20px] bg-blue-600">
      {props.profile === null ? (
        <img
          src="/blank-profile.png"
          alt="profile"
          className="object-cover w-full max-h-full rounded-tl-[20px] rounded-tr-[20px]"
        />
      ) : (
        <img
          src={props.profile}
          alt="profile"
          className="object-cover w-full max-h-full rounded-tl-[20px] rounded-tr-[20px]"
        ></img>
      )}
      {props.name === null ? (
        <div />
      ) : (
        <div className="text-white font-bold h-[6vh] grid justify-center items-center">안녕하세요 {props.name}님!</div>
      )}
    </div>
  );
}