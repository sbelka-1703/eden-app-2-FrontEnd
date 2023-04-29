import { MdMobileOff } from "react-icons/md";

interface IAppDeviceLayoutProps {}

export const AppDeviceLayout = ({}: IAppDeviceLayoutProps) => {
  const UA = navigator.userAgent;
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return (
    <>
      {isMobile && (
        <section className="fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-white">
          <p className="text-darkGreen -ml-2 mb-4 text-2xl font-bold">
            🌱 Eden.
          </p>
          <p className="mb-2 text-center">
            Mobile site is
            <br /> under construction.
            <br /> Use your laptop.
          </p>
          <MdMobileOff className="text-2xl" />
        </section>
      )}
    </>
  );
};

export default AppDeviceLayout;
