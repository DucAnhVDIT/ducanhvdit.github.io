import Repository from "./Version1Repository";

const getSchedules = "/GetSchedules";

const businessID = "20160908110055249272";

export default {
    getSchedules(payload: any) {
    return Repository.post(`${getSchedules}`, {
      ...payload,
      business_id: businessID,
    });
  },
};
