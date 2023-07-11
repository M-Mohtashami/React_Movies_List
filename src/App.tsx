import { useState } from 'react';
import { Form } from './component/Form';
import Header from './component/Header';
import Movies from './component/Movies';
import { FormProvider } from './context/FormContext';
import DetailsModal from './component/DetailsModal';

function App() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState('توضیحی وجود ندارد');
  //handle details button
  const handelOpen = (movieDetail: string) => {
    setDetails(movieDetail);
    setOpen(true);
  };
  const handelClose = () => {
    setDetails('توضیحی وجود ندارد');
    setOpen(false);
  };
  return (
    <div className="h-full w-full bg-[#595959] font-vazir text-sm ">
      <Header />
      <FormProvider>
        <div className="w-full flex items-center justify-center bg-[#515050] ">
          <Form />
        </div>
        <Movies handelOpen={handelOpen} />
        <DetailsModal details={details} open={open} handelClose={handelClose} />
      </FormProvider>
    </div>
  );
}

export default App;
