import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  tableCellClasses,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSubmit } from '../hooks/useSubmit';
import { MovieType, StateType } from '../interfaces/interfaces';
import { isRequired } from '../lib/validations';
import FormSelect from './form/FormSelect';
import FormInput from './form/FormInput';
import { toast, ToastContainer } from 'react-toastify';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

type ColumnType = {
  id:
    | 'name'
    | 'genre'
    | 'director'
    | 'year'
    | 'row'
    | 'detail'
    | 'edit'
    | 'delete';
  label: string;
};
let columns: ColumnType[] = [
  {
    id: 'row',
    label: 'ردیف',
  },
  {
    id: 'name',
    label: 'نام فیلم',
  },
  {
    id: 'genre',
    label: 'ژانر فیلم',
  },
  {
    id: 'director',
    label: 'کارگردان',
  },
  {
    id: 'year',
    label: 'سال ساخت',
  },
  {
    id: 'detail',
    label: 'توضیحات',
  },
  {
    id: 'edit',
    label: 'ویرایش',
  },
  {
    id: 'delete',
    label: 'حذف',
  },
];

const theme = createTheme({
  typography: {
    fontFamily: 'vazir',
  },
});

const getWindowWidth = () => {
  const { innerWidth: width } = window;
  return width;
};
const Movies = ({ handelOpen }: { handelOpen: (val: string) => void }) => {
  const { state, dispatch } = useSubmit();
  const [rows, setRows] = useState<MovieType[]>([]);
  const [filter, setFilter] = useState('همه');
  const [search, setSearch] = useState('');
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  let counter = 1;
  //handle edit button on click event
  const handelEdit = (movie: StateType) => {
    dispatch({
      type: 'Fetch_Data_To_Form',
      payload: movie,
    });
  };
  //handle delete button
  const handelDelete = (movie: MovieType) => {
    axios.delete(`http://localhost:3000/movies/${movie.id}`).then(() => {
      toast.error(`${movie.name} با موفقیت حذف شد`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      dispatch({ type: 'Render_Ui', payload: !state.isSubmited });
    });
  };
  //handel filter state
  const handelFilter = (value: string) => {
    setFilter(value);
  };
  //handel search state
  const handelSearch = (value: string) => {
    setSearch(value);
  };
  useEffect(() => {
    if (filter === 'همه' && search === '') {
      axios.get('http://localhost:3000/movies').then((response) => {
        setRows(response.data);
      });
    } else if (filter !== 'همه') {
      axios
        .get(`http://localhost:3000/movies?genre=${filter}`)
        .then((response) => {
          setRows(response.data);
        });
    } else {
      axios.get(`http://localhost:3000/movies?q=${search}`).then((response) => {
        setRows(response.data);
      });
    }
  }, [state.isSubmited, filter, search]);

  useEffect(() => {
    console.log(windowWidth);
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    if (windowWidth <= 480) {
      columns = [
        {
          id: 'row',
          label: 'ردیف',
        },
        {
          id: 'name',
          label: 'نام فیلم',
        },
        {
          id: 'detail',
          label: 'توضیحات',
        },
        {
          id: 'edit',
          label: 'ویرایش',
        },
        {
          id: 'delete',
          label: 'حذف',
        },
      ];
    } else if (windowWidth <= 600) {
      columns = [
        {
          id: 'row',
          label: 'ردیف',
        },
        {
          id: 'name',
          label: 'نام فیلم',
        },
        {
          id: 'director',
          label: 'کارگردان',
        },
        {
          id: 'detail',
          label: 'توضیحات',
        },
        {
          id: 'edit',
          label: 'ویرایش',
        },
        {
          id: 'delete',
          label: 'حذف',
        },
      ];
    } else {
      columns = [
        {
          id: 'row',
          label: 'ردیف',
        },
        {
          id: 'name',
          label: 'نام فیلم',
        },
        {
          id: 'genre',
          label: 'ژانر فیلم',
        },
        {
          id: 'director',
          label: 'کارگردان',
        },
        {
          id: 'year',
          label: 'سال ساخت',
        },
        {
          id: 'detail',
          label: 'توضیحات',
        },
        {
          id: 'edit',
          label: 'ویرایش',
        },
        {
          id: 'delete',
          label: 'حذف',
        },
      ];
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  return (
    <div className="bg-[#595959] flex flex-col pb-8">
      <div className="w-full flex items-center justify-between mt-4 px-6">
        <span className="border-r-[0.4rem] border-yellow-500 rounded-sm pr-2 text-gray-50 font-semibold ">
          {'لیست فیلم'}
        </span>
        <div className="flex items-start gap-2">
          <FormSelect
            state={{ value: filter, error: '' }}
            options={['اکشن', 'هیجانی', 'درام', 'جنایی', 'علمی تخیلی']}
            onChange={handelFilter}
          />
          <FormInput
            type="search"
            placeholder="جستجو..."
            state={{ value: search, error: '' }}
            onChange={handelSearch}
          />
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <TableContainer classes={{ root: 'px-6 lg:px-16' }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  if (column.id === 'edit') {
                    return (
                      <TableCell
                        sx={{ root: 'hidden md:inline' }}
                        key={column.id}
                        align="center"
                      >
                        <span className="hidden md:inline text-gray-300 font-semibold">
                          {column.label}
                        </span>
                        <span className="md:hidden text-gray-300">
                          <CiEdit />
                        </span>
                      </TableCell>
                    );
                  }
                  if (column.id === 'detail') {
                    return (
                      <TableCell key={column.id} align="center">
                        <span className="hidden md:inline text-gray-300 font-semibold">
                          {column.label}
                        </span>
                        <span className="md:hidden text-gray-300">
                          <BsInfoCircle />
                        </span>
                      </TableCell>
                    );
                  }
                  if (column.id === 'delete') {
                    return (
                      <TableCell key={column.id} align="center">
                        <span className="hidden md:inline text-gray-300 font-semibold">
                          {column.label}
                        </span>
                        <span className="md:hidden text-gray-300">
                          <MdOutlineDelete />
                        </span>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={column.id} align="center">
                      <span className="text-gray-300 font-semibold">
                        {column.label}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 'none',
                },
              }}
            >
              {rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {columns.map((column, index) => {
                      switch (column.id) {
                        case 'row':
                          return (
                            <TableCell key={column.id} align="center">
                              <span className="text-gray-300 font-medium">
                                {counter++}
                              </span>
                            </TableCell>
                          );
                        case 'detail':
                          return (
                            <TableCell key={column.id} align="center">
                              <button
                                onClick={() => handelOpen(row.desc)}
                                className="md:border flex items-center gap-1 border-blue-600 text-blue-600 rounded-md py-1 px-4 md:text-gray-300 md:hover:bg-blue-500 hover:bg-opacity-30"
                              >
                                <span className="hidden md:flex">
                                  {'توضیحات'}
                                </span>
                                <BsInfoCircle />
                              </button>
                            </TableCell>
                          );
                        case 'edit':
                          return (
                            <TableCell
                              key={column.id}
                              align="center"
                              onClick={() =>
                                handelEdit({
                                  targetId: row.id,
                                  name: {
                                    value: row.name,
                                    error: isRequired(row.name),
                                  },
                                  genre: {
                                    value: row.genre,
                                    error: isRequired(row.genre),
                                  },
                                  desc: { value: row.desc, error: '' },
                                  director: {
                                    value: row.director,
                                    error: isRequired(row.director),
                                  },
                                  year: {
                                    value: row.year,
                                    error: isRequired(row.year),
                                  },
                                  submit: 'ویرایش',
                                  isSubmited: false,
                                })
                              }
                            >
                              <button className="md:border flex items-center gap-1 border-green-600 text-green-600 rounded-md py-1 px-4 md:text-gray-300 md:hover:bg-green-500 hover:bg-opacity-30">
                                <span className="hidden md:flex">
                                  {'ویرایش'}
                                </span>
                                <CiEdit />
                              </button>
                            </TableCell>
                          );
                        case 'delete':
                          return (
                            <TableCell key={column.id} align="center">
                              <button
                                onClick={() => handelDelete(row)}
                                className="md:border flex items-center gap-1 border-red-500 text-red-500 rounded-md py-1 px-4 md:text-gray-300 md:hover:bg-red-500 hover:bg-opacity-30"
                              >
                                <span className="hidden md:flex">{'حذف'}</span>
                                <MdOutlineDelete />
                              </button>
                            </TableCell>
                          );
                        default:
                          return (
                            <TableCell key={column.id} align="center">
                              <span className="text-gray-300 font-medium">
                                {row[column.id]}
                              </span>
                            </TableCell>
                          );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>

      <ToastContainer />
    </div>
  );
};

export default Movies;
