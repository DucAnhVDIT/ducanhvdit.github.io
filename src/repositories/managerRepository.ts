import Repository from "./Version1Repository";

const getBusinessInfo = "/GetBusinessInfo";
const updateBusinessInfo ="/UpdateBusinessInfo"

const businessID = "20160908110055249272";

export default {
  getBusinessInfo() {
    return Repository.post(`${getBusinessInfo}`, {
      business_id: businessID,
    });
  },
  updateBusinessInfo(payload: any){
    return Repository.post(`${updateBusinessInfo}`, {
      ...payload,
      business_id: businessID,
    });
  }
};
