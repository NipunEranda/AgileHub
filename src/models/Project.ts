// Interfaces
export interface _Project {
  _id: string;
  name: string;
  key: string;
  type: number;
  category: number;
  lead: number;
  url: string;
  isDeleted: boolean;
}

// Classes
export class Project {
  name: string;
  key: string;
  type: number;
  category: number;
  lead: number;
  url: string;
  isDeleted: boolean;

  constructor(
    name: string,
    key: string,
    type: number,
    category: number,
    lead: number,
    url: string,
    isDeleted: boolean
  ) {
    this.name = name;
    this.key = key;
    this.type = type;
    this.category = category;
    this.lead = lead;
    this.url = url;
    this.isDeleted = isDeleted;
  }

  static createObject(obj: _Project) {
    return new Project(
      obj.name,
      obj.key,
      obj.type,
      obj.category,
      obj.lead,
      obj.url,
      obj.isDeleted
    );
  }

  static createEmptyObject() {
    return new Project("", "", 0, 0, 0, "", false);
  }
}
