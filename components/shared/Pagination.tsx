import { Button } from '../ui/button';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  disableNextBtn: boolean;
  disablePrevBtn: boolean;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  setPage,
  disableNextBtn,
  disablePrevBtn,
}) => {
  return (
    <div className="flex-center">
      <div className="flex">
        <Button
          className="bg-white-100 shadow-card dark:bg-black-800 rounded-[5px] px-3.5 py-2.5"
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={disablePrevBtn}
        >
          <span className="p3-medium break-keep!">Prev</span>
        </Button>
        <div className="flex-center px-8 py-2.5">
          <span className="p3-regular break-keep!">
            {currentPage}/{totalPages}
          </span>
        </div>
        <Button
          className="bg-white-100 shadow-card dark:bg-black-800 rounded-[5px] px-3.5 py-2.5"
          onClick={() => {
            setPage((prevPage) => prevPage + 1);
          }}
          disabled={disableNextBtn}
        >
          <span className="p3-medium break-keep!">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
