import Button from '../../../components/Button';
import Search from '../../../components/Search';
import Results from '../../../components/Results';

export default function HomePage() {
  return (
    <>
      <div className="layout border p-4 rounded-xl border-gray-400 bg-white mt-[75px]">
        <Search />
      </div>

      <div className="layout mt-[20px]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="text-2xl pb-[10px] text-start font-semibold">
            Results
          </h1>
          <Button>Trigger Error</Button>
        </div>

        <div>
          <Results />
        </div>
      </div>
    </>
  );
}
