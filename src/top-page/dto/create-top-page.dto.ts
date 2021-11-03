import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	isEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export enum ToplevelCategory {
	Courses,
	Services,
	Books,
	Product,
}
export class HhData {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}
export class TopPageAdvantage {
	@IsString()
	title: string;

	@IsString()
	description: string;
}
export class CreateTopPageDto {
	@IsEnum(ToplevelCategory)
	firstCategory: ToplevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => HhData)
	hh?: HhData;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => TopPageAdvantage)
	advantages: TopPageAdvantage[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
