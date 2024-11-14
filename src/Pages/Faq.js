import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "../Components/Headers";
import Loader from "../Components/Loader";
import SideBar from "../Components/SideBar";
import { fetchFaq } from "../Redux/Action/userReducer";

const Faq = () => {
  const { isLoading, faq } = useSelector((state) => state.userReducer);
  const [faqActive, setFaqActive] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFaq())
  }, []);

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="ct_dashboard_main_bg">
      <Headers />
      <div className="ct_dashboard_inner">
        <SideBar path="Faq" />
        <div className="ct_dashboard_right_cnt">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>
                  <span className="ct_fs_30 ct_ff_oswald text-white ct_fw_600">
                    FAQ
                  </span>
                </h3>
                <div className="accordion mt-5 ct_custom_faq" id="accordionExample">
                  {faq?.length != 0 ?
                    faq?.map((item, i) => (
                      <div className="accordion-item" onClick={() => setFaqActive(i)}>
                        <h2 className="accordion-header" id={`headingOne${i}`}>
                          <button
                            className={`accordion-button ${faqActive != i && 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseOne${i}`}
                            aria-expanded="true"
                            aria-controls={`collapseOne${i}`}
                          >
                            {item?.question ?? ''}
                          </button>
                        </h2>
                        <div
                          id={`collapseOne${i}`}
                          className={`accordion-collapse ${faqActive == i ? 'show' : 'collapse'}`}
                          aria-labelledby={`headingOne${i}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p className="mb-0 text-white">
                              {item?.answer ?? ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                    :
                    <div className="">
                      <p className="mb-0 mt-3 ct_fs_24 ct_fw_400 ct_ff_poppin ct_clr_8C98A9 text-center">Faq not found.</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Faq;
