import Spinner from '../../../../../components/Spinner';

export default function Loading() {
  return (
    <>
      <div className="border rounded-md p-3 h-[600px] flex justify-center items-center">
        <Spinner />
      </div>
    </>
  );
}
