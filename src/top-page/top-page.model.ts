import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum ToplevelCategory {
	Courses,
	Services,
	Books,
	Product,
}
export class HhData {
	@prop()
	count: number;
	@prop()
	juniorSalary: number;
	@prop()
	middleSalary: number;
	@prop()
	seniorSalary: number;
}
export class TopPageAdvantage {
	@prop()
	title: string;
	@prop()
	description: string;
}
export interface TopPageModel extends Base {}
//@index({ title: 'text', seoText: 'text' })
@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
	@prop({ enum: ToplevelCategory })
	firstCategory: ToplevelCategory;
	@prop()
	secondCategory: string;
	@prop({ unique: true })
	alias: string;
	@prop()
	title: string;
	@prop()
	category: string;
	@prop({ type: () => HhData })
	hh?: HhData;
	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];
	@prop()
	seoText: string;
	@prop()
	tagsTitle: string;
	@prop({ type: () => [String] })
	tags: string[];
}
