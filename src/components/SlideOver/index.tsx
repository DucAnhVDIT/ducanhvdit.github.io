
  import { Menu, Slideover } from "../../base-components/Headless";
  import {
    FormLabel,
    FormInput,
    FormSelect,
  } from "../../base-components/Form";
  import Button from "../../base-components/Button";
  import Lucide from "../../base-components/Lucide";
  import { useState } from "react";
import Tippy from "../../base-components/Tippy";
import clsx from "clsx";
import { DatePicker, Input } from "react-rainbow-components";
import TippyContent from "../../base-components/TippyContent";
import DatePickerMUI from "../DatePicker";
import CustomDatePicker from "../DatePicker";



//   const [headerFooterSlideoverPreview, setHeaderFooterSlideoverPreview] = useState(false);
  interface SlideOverPanelProps {
    isOpen: boolean;
    onClose: () => void;
  }
function SlideOverPanel({ isOpen, onClose}: SlideOverPanelProps) {
    const [isSecondSlideoverOpen, setSecondSlideoverOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    const openSearchClient = () => {
        setSecondSlideoverOpen(true)
    }

    const closeSearchClient = () => {
        setSecondSlideoverOpen(false)
    }
  return (
    <div>
          <Slideover
              staticBackdrop
              open={isOpen}
              onClose={onClose}
          >
              {/* BEGIN: Slide Over Header */}
              <Slideover.Panel>
                  <Button
                      onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          onClose()
                      } }
                      className="absolute w-14 h-14 top-0 left-0 right-auto mt-4 -ml-16 bg-white rounded-full"
                  >
                      <Lucide icon="X" className="w-8 h-8 text-black" />
                  </Button>
                  <Slideover.Title>
                      <h1 className="mr-auto font-bold text-2xl">
                          New Appoinment
                      </h1>
                      <Menu className="sm:hidden">
                          <Menu.Button
                              as="a"
                              className="block w-5 h-5"
                              href="#"
                          >
                              <Lucide
                                  icon="MoreHorizontal"
                                  className="w-5 h-5 text-slate-500" />
                          </Menu.Button>
                          <Menu.Items className="w-40">
                              <Menu.Item>
                                  <Lucide icon="File" className="w-4 h-4 mr-2" />
                                  Download Docs
                              </Menu.Item>
                          </Menu.Items>
                      </Menu>
                  </Slideover.Title>
                  {/* END: Slide Over Header */}
                  {/* BEGIN: Slide Over Body */}
                  <Slideover.Description>
                    <Button className="border-none bg-transparent w-full shadow-none" onClick={openSearchClient}>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y border-2 rounded-lg w-full">
                            <div
                            className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
                            >
                            <div className="p-3">
                                <div className="flex">
                                <Lucide
                                    icon="User"
                                    className="w-14 h-14 rounded-full p-3 bg-primary text-white"
                                />
                                <div className=" mt-4 ml-3">
                                    <h1 className="text-lg">Select a client</h1>
                                    {/* <h2>Leave empty for walkins</h2> */}
                                </div>
                                <div className="ml-auto">
                                    <Button className="border-none shadow-none cursor-pointer ">
                                    <Lucide
                                        icon="Plus"
                                        className="w-12 h-12 p-3 text-primary text-lg"
                                    />
                                    </Button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Button>

                    {isSecondSlideoverOpen && (
                        <Slideover open={isSecondSlideoverOpen} onClose={closeSearchClient}>
                        <Slideover.Panel>
                            <Slideover.Title className="p-5">
                                <h2 className="mr-auto font-bold text-2xl">
                                    Search Client
                                </h2>
                            </Slideover.Title>
                            <Slideover.Description className="text-center">
                                <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                    <div className="relative text-slate-500">
                                    <FormInput
                                            type="text"
                                            className="w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                                            placeholder="Search..."
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                        {searchValue ? (
                                            <Lucide
                                                icon="XCircle"
                                                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3 cursor-pointer"
                                                onClick={() => setSearchValue("")}
                                            />
                                        ) : (
                                            <Lucide
                                                icon="Search"
                                                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                            />
                                        )}
                                    </div>
                                </div>
                            </Slideover.Description>
                        </Slideover.Panel>
                    </Slideover>
                    )}

                    <div className="flex flex-row mt-5">
                       
                    </div>
                  </Slideover.Description>
                  {/* END: Slide Over Body */}
                  {/* BEGIN: Slide Over Footer */}
                  <Slideover.Footer>
                      <Button
                          variant="outline-secondary"
                          type="button"
                          onClick={() => {
                            onClose() }}
                          className="w-20 mr-1"
                      >
                          Cancel
                      </Button>
                      <Button
                          variant="primary"
                          type="button"
                          className="w-20"
                      >
                          Send
                      </Button>
                  </Slideover.Footer>
              </Slideover.Panel>
              {/* END: Slide Over Footer */}
          </Slideover>
          {/* END: Slide Over Content */}
    </div>
  )
}

export default SlideOverPanel