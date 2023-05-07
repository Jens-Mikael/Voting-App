import ThemeSwitch from "./ThemeSwitch";

export default function Drawer({ children, isDrawerOpen, setIsDrawerOpen }) {
  return (
    <>
      {/* THE OPACITY EFFECT WHICH IS ALSO THE PARENT FOR THE DRAWER */}
      <div
        className={
          " fixed overflow-hidden z-10 bg-slate-800 bg-opacity-25 duration-500 inset-0 transform " +
          (isDrawerOpen
            ? "transition-opacity opacity-100 translate-x-0  "
            : "transition-all opacity-0  translate-x-full ")
        }
      >
        {/* THE WHITE DRAWER ITSELF */}
        <div
          className={
            " w-screen max-w-[15rem] px-5 py-5 right-0 absolute  bg-white dark:bg-slate-900 h-full shadow-xl duration-500 transition-transform  transform " +
            (isDrawerOpen ? " translate-x-0" : " translate-x-full")
          }
        >
          {/* DRAWER CONTENT */}

          <div className="font-bold text-xl flex justify-between pb-10">
            <div>MENU</div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="hover:scale-110 dark:hover:opacity-70 transition cursor-pointer"
            >
              <svg
                className="fill-[#0f172a] dark:fill-[#e2e8f0] h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
          <div className="text-center">
          {children}
          </div>
          
          
        </div>

        {/* CLOSE DRAWER BY CLICKING OUTIDE */}
        <div
          className=" w-screen h-full cursor-pointer "
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        ></div>
      </div>
    </>
  );
}
