export default function ProfileCard(props) {
  return (
    <div className="box-border gird rounded-[20px] bg-orange-400">
      {props.profile === null ? (
        <img
          src="/blank-profile.png"
          alt="profile"
          style={{
            objectFit: "cover",
            width: "100%",
            maxHeight: "100%",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        />
      ) : (
        <img
          src={props.profile}
          alt="profile"
          style={{
            objectFit: "cover",
            width: "100%",
            maxHeight: "100%",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        ></img>
      )}
      {props.name === null ? (
        <div />
      ) : (
        <div className="text-[#033075] font-bold h-[6vh] grid justify-center items-center">안녕하세요 {props.name}님!</div>
      )}
    </div>
  );
}