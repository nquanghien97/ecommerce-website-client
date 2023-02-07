import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deleteTrending } from '../../../api/trendingServices';
import { Modal } from '@material-ui/core';

const useStyles = makeStyles({
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: '12px',
    padding: '8px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#ccc'
  },
})

function DeleteProduct(props) {

  const classes = useStyles();
  
  const { showDel, setShowDel, id, data, setData } = props

  const cancleDel = () => {
    setShowDel(false)
  }

  const handleDel = async () => {
    await deleteTrending(id);
    const newData = data.filter((item) => {
      return item._id !== id
    })
    setData(newData)
    setShowDel(false)
  }

  return (
    <div>
      <Modal
        open={showDel}
        onClose={cancleDel}
      >
        <div className={classes.container}>
          <h2>Bạn có muốn xóa không?</h2>
          <div className={classes.btnGroup}>
              <button className={classes.btn} onClick={cancleDel}>Không</button> 
              <button className={classes.btn} onClick={handleDel}>Có</button> 
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteProduct