
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



//   const [headerFooterSlideoverPreview, setHeaderFooterSlideoverPreview] = useState(false);
  interface SlideOverPanelProps {
    isOpen: boolean;
    onClose: () => void;
  }
function SlideOverPanel({ isOpen, onClose}: SlideOverPanelProps) {
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
                  <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                        <div
                        className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
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