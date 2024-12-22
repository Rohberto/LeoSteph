import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "column",
        height: "60vh",
      }}
    >
      <TailSpin
        height="60"
        width="60"
        color="#1E293B"
        ariaLabel="tail-spin-loading"
        radius="0.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
