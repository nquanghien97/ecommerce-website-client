import { useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { makeStyles, Container, Box } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    inset: 0,
    top: '70px',
    zIndex: 1000
  },
  overlay: {
    inset: 0,
    zIndex: '-1',
  },
  wrapper: {
    opacity: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12)'
  }
});

export default function Modal(props) {
  const {
    children,
    open,
    onClose
  } = props;

  const classes = useStyles();

  const wrapperRef = useRef(null);

  const closeModal = useCallback((e) => {
      if (
        wrapperRef &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        onClose()
      }
    },[onClose]);

  useEffect(() => {
    document.addEventListener("click", closeModal, { capture: true });

    return () => {
      document.removeEventListener("click", closeModal, { capture: true });
    };
  }, [closeModal]);

  return open ? createPortal(
    <Container fixed className={classes.container}>
      <Box fixed className={classes.overlay}></Box>
      <div className={classes.wrapper}>
        <div ref={wrapperRef} className={classes.body}>
          {children}
        </div>
      </div>
    </Container>,
    document.body
  ) : null
}
