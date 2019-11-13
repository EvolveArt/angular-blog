import * as moment from "moment";

export class Post {
  title: string;
  content: string;
  loveIts: number;

  private readonly created_at: moment.Moment;
  private readonly dateFormat = "MM/DD/YYYY, HH:mm A";

  constructor(title: string, content: string, loveIts: number) {
    this.title = title;
    this.content = content;
    this.loveIts = loveIts;
    this.created_at = moment();
  }

  public get creationDate(): string {
    return moment(this.created_at).format(this.dateFormat);
  }
}
