import { Box, Modal } from '@mui/material';

type Props = {
  details: string;
  open: boolean;
  handelClose: () => void;
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  padding: 6,
  flexItems: 'center',
  JustifyContent: 'center',
  bgcolor: '#D9D9D9',
  borderRadius: 2,
  boxShadow: 24,
};

const DetailsModal = ({ details, open, handelClose }: Props) => {
  return (
    <Modal open={open} onClose={handelClose}>
      <Box sx={{ ...style }}>
        <div className="w-full flex items-center justify-between">
          <span className="font-semibold text-xl text-gray-600">
            {'توضیحات'}
          </span>
          <button className="text-red-500" onClick={handelClose}>
            {'بستن x'}
          </button>
        </div>
        <div className="w-full h-full border border-gray-700 rounded-md px-6 py-2">
          {details}
        </div>
      </Box>
    </Modal>
  );
};

export default DetailsModal;
