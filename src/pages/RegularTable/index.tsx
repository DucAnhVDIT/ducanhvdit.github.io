import _ from "lodash";
import Table from "../../base-components/Table";
import {
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "../../base-components/PreviewComponent";
import { FormSwitch } from "../../base-components/Form";

function Main() {
  return (
    <>
      {/* <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Regular Table</h2>
      </div> */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Hoverable Table */}
          <PreviewComponent className="mt-5 intro-y box">
            {({ toggle }) => (
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                  <h2 className="mr-auto text-base font-medium">
                    Clients List
                  </h2>
                  {/* <FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <FormSwitch.Label htmlFor="show-example-3">
                      Show example code
                    </FormSwitch.Label>
                    <FormSwitch.Input
                      id="show-example-3"
                      onClick={toggle}
                      className="ml-3 mr-0"
                      type="checkbox"
                    />
                  </FormSwitch> */}
                </div>
                <div className="p-5">
                  <Preview>
                    <div className="overflow-x-auto">
                      <Table
                        bordered
                        hover
                      >
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th className="whitespace-nowrap">#</Table.Th>
                            <Table.Th className="whitespace-nowrap">
                              First Name
                            </Table.Th>
                            <Table.Th className="whitespace-nowrap">
                              Last Name
                            </Table.Th>
                            <Table.Th className="whitespace-nowrap">
                              Username
                            </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          <Table.Tr>
                            <Table.Td>1</Table.Td>
                            <Table.Td>Angelina</Table.Td>
                            <Table.Td>Jolie</Table.Td>
                            <Table.Td>@angelinajolie</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>2</Table.Td>
                            <Table.Td>Brad</Table.Td>
                            <Table.Td>Pitt</Table.Td>
                            <Table.Td>@bradpitt</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>3</Table.Td>
                            <Table.Td>Charlie</Table.Td>
                            <Table.Td>Hunnam</Table.Td>
                            <Table.Td>@charliehunnam</Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                      </Table>
                    </div>
                  </Preview>
                  <Source>
                    <Highlight>
                      {`
                <div className="overflow-x-auto">
                  <Table
                    bordered
                    hover
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th className="whitespace-nowrap">#</Table.Th>
                        <Table.Th className="whitespace-nowrap">
                          First Name
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap">
                          Last Name
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap">
                          Username
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td>1</Table.Td>
                        <Table.Td>Angelina</Table.Td>
                        <Table.Td>Jolie</Table.Td>
                        <Table.Td>@angelinajolie</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>2</Table.Td>
                        <Table.Td>Brad</Table.Td>
                        <Table.Td>Pitt</Table.Td>
                        <Table.Td>@bradpitt</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>3</Table.Td>
                        <Table.Td>Charlie</Table.Td>
                        <Table.Td>Hunnam</Table.Td>
                        <Table.Td>@charliehunnam</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </div>
                `}
                    </Highlight>
                  </Source>
                </div>
              </>
            )}
          </PreviewComponent>
          {/* END: Hoverable Table */}
        </div>
      </div>
    </>
  );
}

export default Main;
