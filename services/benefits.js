import Benefits from '../models/benefits.js';

export default class BenefitsService {
  //////////////////////////////////////////
  constructor() {
    this.benefits = new Benefits();
  }
  //////////////////////////////////////////
  async postBenefits(data) {
    const rec = await this.benefits.postBenefits(data);

    if (!rec) {
      return { message: 'Error creating benefit', error: -1 };
    }

    return { message: 'Benefit created successfully' };
  }
  //////////////////////////////////////////
  async putBenefits(data) {
    const rec = this.benefits.putBenefits(data);

    if (!rec) {
      return { message: 'Error updating benefit', error: -1 };
    }

    return { message: 'Benefit updated successfully' };
  }
  //////////////////////////////////////////
  async getBenefits(data) {
    const rec = this.benefits.getBenefits(data);

    if (!rec) {
      return { message: 'Error fetching benefit', error: -1 };
    }

    return rec;
  }
}
