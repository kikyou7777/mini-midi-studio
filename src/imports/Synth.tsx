function Instrument() {
  return (
    <div
      className="relative rounded-lg shrink-0 size-16"
      data-name="instrument"
    >
      <div className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
          <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.56px]">
            <div className="leading-none whitespace-pre">
              Drum<span className="[-webkit-text-fill-color:inherit]">s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Instrument1() {
  return (
    <div
      className="relative rounded-lg shrink-0 size-16"
      data-name="instrument"
    >
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
          <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.56px]">
            <div className="leading-none whitespace-pre">
              Bas<span className="[-webkit-text-fill-color:inherit]">s</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-lg" />
    </div>
  );
}

function ActiveInstrumentColor99Ff71() {
  return (
    <div
      className="bg-[#99ff71] relative rounded-lg shrink-0 size-16"
      data-name="active instrument - color: #99FF71"
    >
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
          <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#292929] text-[14px] text-left text-nowrap tracking-[0.56px]">
            <div className="leading-none whitespace-pre">
              Synt<span className="[-webkit-text-fill-color:inherit]">h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstrumentContainer() {
  return (
    <div className="relative shrink-0" data-name="Instrument Container">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <Instrument />
          <Instrument1 />
          <ActiveInstrumentColor99Ff71 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative w-full">
          <div className="css-qmdr3l font-['Michroma:Regular',_sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#ffffff] text-[24px] text-left text-nowrap uppercase whitespace-pre">
            <div className="mb-0">earworm</div>
            <div>studio</div>
          </div>
          <InstrumentContainer />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute left-[25.6px] right-[25.6px] top-[25.6px]"
      data-name="nav"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[25.6px] items-center justify-start p-0 relative w-full">
          <Header />
          <div className="h-0 relative shrink-0 w-full" data-name="hr">
            <div className="absolute bottom-[-0.4px] left-0 right-0 top-[-0.4px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1389 2"
              >
                <path
                  d="M0 1H1388.8"
                  id="hr"
                  stroke="var(--stroke-0, #626262)"
                  strokeWidth="0.8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function A4() {
  return (
    <div className="relative shrink-0" data-name="A4">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <div
            className="relative rounded-lg shrink-0 size-12"
            data-name="Playing Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function C4() {
  return (
    <div className="relative shrink-0" data-name="C4">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <div
            className="relative rounded-lg shrink-0 size-12"
            data-name="Playing Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function D4() {
  return (
    <div className="relative shrink-0" data-name="D4">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <div
            className="relative rounded-lg shrink-0 size-12"
            data-name="Playing Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function E4() {
  return (
    <div className="relative shrink-0" data-name="E4">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <div
            className="relative rounded-lg shrink-0 size-12"
            data-name="Playing Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function G4() {
  return (
    <div className="relative shrink-0" data-name="G4">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <div
            className="relative rounded-lg shrink-0 size-12"
            data-name="Playing Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function A5() {
  return (
    <div className="relative shrink-0" data-name="A5">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <div
            className="relative rounded-lg shrink-0 size-12"
            data-name="Playing Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="bg-[#99ff71] rounded-lg shrink-0 size-12"
            data-name="Selected Step"
          />
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
          <div
            className="opacity-40 relative rounded-lg shrink-0 size-12"
            data-name="Step"
          >
            <div className="absolute border border-[#f0f0f0] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Keys() {
  return (
    <div
      className="absolute top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="keys"
      style={{ left: "calc(50% + 0.000366211px)" }}
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative">
          <A4 />
          <C4 />
          <D4 />
          <E4 />
          <G4 />
          <A5 />
        </div>
      </div>
    </div>
  );
}

function PlayStopButton() {
  return (
    <div
      className="relative rounded-lg shrink-0 size-16"
      data-name="Play/stop Button"
    >
      <div className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
          <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.56px]">
            <div className="leading-none whitespace-pre">
              Pla<span className="[-webkit-text-fill-color:inherit]">y</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoButton() {
  return (
    <div
      className="relative rounded-lg shrink-0 size-16"
      data-name="demo button"
    >
      <div className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative size-16">
          <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap tracking-[0.56px]">
            <div className="leading-none whitespace-pre">
              Dem<span className="[-webkit-text-fill-color:inherit]">o</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2147236673() {
  return (
    <div className="relative shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
          <PlayStopButton />
          <DemoButton />
        </div>
      </div>
    </div>
  );
}

function TempoValueContainer() {
  return (
    <div
      className="bg-[#3b3b3b] h-[42px] relative rounded-[7.65957px] shrink-0"
      data-name="Tempo Value Container"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-[42px] items-center justify-center p-[8px] relative">
          <div className="font-['Geist:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[20px] text-left text-nowrap">
            <div className="leading-none whitespace-pre">120</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TempoContainer() {
  return (
    <div className="h-16 relative shrink-0" data-name="Tempo Container">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col h-16 items-center justify-between p-0 relative">
          <TempoValueContainer />
          <div className="font-['Figma_Sans_VF:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
            <div className="leading-none whitespace-pre">Tempo</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-16 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-16 items-center justify-between p-0 relative w-full">
          <Frame2147236673 />
          <TempoContainer />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div
      className="absolute bottom-[25.6px] left-[25.6px] right-[25.6px]"
      data-name="footer"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[25.6px] items-center justify-start p-0 relative w-full">
          <div className="h-0 relative shrink-0 w-full" data-name="hr">
            <div className="absolute bottom-[-0.4px] left-0 right-0 top-[-0.4px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1389 2"
              >
                <path
                  d="M0 1H1388.8"
                  id="hr"
                  stroke="var(--stroke-0, #626262)"
                  strokeWidth="0.8"
                />
              </svg>
            </div>
          </div>
          <Container />
        </div>
      </div>
    </div>
  );
}

export default function Synth() {
  return (
    <div className="bg-[#292929] relative size-full" data-name="Synth">
      <Nav />
      <Keys />
      <Footer />
    </div>
  );
}