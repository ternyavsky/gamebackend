import { ApiProperty } from '@nestjs/swagger';

export class Item {
	@ApiProperty()
	Name: string;
	@ApiProperty()
	Price: number;
	@ApiProperty()
	Quantity: number;
	@ApiProperty()
	Amount: number;
	@ApiProperty()
	Tax: 'none' | 'vat0' | 'vat10' | 'vat20' | 'vat110' | 'vat120';
}
