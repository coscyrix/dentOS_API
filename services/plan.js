import Plan from '../models/plan.js';

export default class PlanService {
  //////////////////////////////////////////
  constructor() {
    this.plan = new Plan();
  }

  //////////////////////////////////////////
  async postPlan(data) {
    const rec = this.plan.postPlan(data);

    if (!rec) {
      return { message: 'Error creating plan', error: -1 };
    }

    return { message: 'Plan created successfully' };
  }
  //////////////////////////////////////////

  async putPlan(data) {
    const rec = this.plan.putPlan(data);

    if (!rec) {
      return { message: 'Error updating plan', error: -1 };
    }

    return { message: 'Plan updated successfully' };
  }
  //////////////////////////////////////////
  async getPlan(data) {
    const rec = this.plan.getPlan(data);
    return rec;
  }
}
