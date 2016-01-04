import { Store } from 'thundercats';
import { Observable } from 'rx';

const { createRegistrar, setter, fromMany } = Store;
const initValue = {
  title: 'Learn To Code | Free Code Camp',
  username: null,
  picture: null,
  points: 0,
  hikesApp: {
    hikes: [],
    // lecture state
    currentHike: {},
    showQuestion: false
  },
  jobsApp: {
    showModal: false
  }
};

export default Store({
  refs: {
    displayName: 'AppStore',
    value: initValue
  },
  init({ instance: store, args: [cat] }) {
    const register = createRegistrar(store);
    // app
    const {
      updateLocation,
      getUser,
      setTitle
    } = cat.getActions('appActions');

    register(
      fromMany(
        setter(
          fromMany(
            getUser,
            setTitle
          )
        ),
        updateLocation
      )
    );

    // hikes
    const {
      toggleQuestions,
      fetchHikes,
      hideInfo,
      grabQuestion,
      releaseQuestion,
      moveQuestion,
      answer
    } = cat.getActions('hikesActions');

    register(
      fromMany(
        toggleQuestions,
        fetchHikes,
        hideInfo,
        grabQuestion,
        releaseQuestion,
        moveQuestion,
        answer
      )
    );


    // jobs
    const {
      findJob,
      saveJobToDb,
      getJob,
      getJobs,
      openModal,
      closeModal,
      handleForm,
      getSavedForm,
      setPromoCode,
      applyCode,
      clearPromo
    } = cat.getActions('JobActions');

    register(
      Observable.merge(
        findJob,
        saveJobToDb,
        getJob,
        getJobs,
        openModal,
        closeModal,
        handleForm,
        getSavedForm,
        setPromoCode,
        applyCode,
        clearPromo
      )
    );
  }
});
