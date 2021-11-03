import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ToplevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel)
		private readonly topPageModel: ModelType<TopPageModel>,
	) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlies(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findCategory(firstCategory: ToplevelCategory) {
		// return this.topPageModel
		// 	.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
		// 	.exec();

		return this.topPageModel
			.aggregate([
				{
					$match: { firstCategory },
				},
				{
					$group: {
						_id: { secondCategory: '$secondCategory' },
						pages: { $push: { alias: '$alias', title: '$title' } },
					},
				},
			])
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel
			.find({ $text: { $search: text, $caseSensitive: false } })
			.exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();
	}
}
