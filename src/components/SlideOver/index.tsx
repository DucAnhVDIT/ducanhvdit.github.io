
  import { Menu, Slideover } from "../../base-components/Headless";
  import {
    FormLabel,
    FormInput,
    FormSelect,
  } from "../../base-components/Form";
  import Button from "../../base-components/Button";
  import Lucide from "../../base-components/Lucide";
  import { useState } from "react";


//   const [headerFooterSlideoverPreview, setHeaderFooterSlideoverPreview] = useState(false);
  interface SlideOverPanelProps {
    isOpen: boolean;
    onClose: () => void;
  }
function SlideOverPanel({ isOpen, onClose }: SlideOverPanelProps) {
  return (
    <div>
          <Slideover
              staticBackdrop
              open={isOpen}
              onClose={onClose}
          >
              {/* BEGIN: Slide Over Header */}
              <Slideover.Panel>
                  <a
                      onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          onClose()
                      } }
                      className="absolute top-0 left-0 right-auto mt-4 -ml-12"
                      href="#"
                  >
                      <Lucide icon="X" className="w-8 h-8 text-slate-400" />
                  </a>
                  <Slideover.Title>
                      <h2 className="mr-auto text-base font-medium">
                          Broadcast Message
                      </h2>
                      <Button
                          variant="outline-secondary"
                          className="hidden sm:flex"
                      >
                          <Lucide icon="File" className="w-4 h-4 mr-2" />{" "}
                          Download Docs
                      </Button>
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
                      <div>
                          <FormLabel htmlFor="modal-form-1">From</FormLabel>
                          <FormInput
                              id="modal-form-1"
                              type="text"
                              placeholder="example@gmail.com" />
                      </div>
                      <div className="mt-3">
                          <FormLabel htmlFor="modal-form-2">To</FormLabel>
                          <FormInput
                              id="modal-form-2"
                              type="text"
                              placeholder="example@gmail.com" />
                      </div>
                      <div className="mt-3">
                          <FormLabel htmlFor="modal-form-3">
                              Subject
                          </FormLabel>
                          <FormInput
                              id="modal-form-3"
                              type="text"
                              placeholder="Important Meeting" />
                      </div>
                      <div className="mt-3">
                          <FormLabel htmlFor="modal-form-4">
                              Has the Words
                          </FormLabel>
                          <FormInput
                              id="modal-form-4"
                              type="text"
                              placeholder="Job, Work, Documentation" />
                      </div>
                      <div className="mt-3">
                          <FormLabel htmlFor="modal-form-5">
                              Doesn't Have
                          </FormLabel>
                          <FormInput
                              id="modal-form-5"
                              type="text"
                              placeholder="Job, Work, Documentation" />
                      </div>
                      <div className="mt-3">
                          <FormLabel htmlFor="modal-form-6">Size</FormLabel>
                          <FormSelect id="modal-form-6">
                              <option>10</option>
                              <option>25</option>
                              <option>35</option>
                              <option>50</option>
                          </FormSelect>
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