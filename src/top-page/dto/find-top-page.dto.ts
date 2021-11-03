import { IsEnum } from 'class-validator';
import { ToplevelCategory } from '../top-page.model';

export class FindTopPageDto {
	@IsEnum(ToplevelCategory)
	firstCategory: ToplevelCategory;
}
