import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AbstractGateway } from 'src/abstracts/gateways/abstract.gateway';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import { ProductInputDTO } from 'src/modules/products/dtos/productsInput.dto';
import { ProductsService } from '../modules/products/products.service';

@WebSocketGateway()
export class ProductGateway extends AbstractGateway<ProductEntity> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
    this.setEntityName('Product');
    this.setGetMethodName('getProducts');
  }

  @SubscribeMessage('createProduct')
  onCreateProduct(@MessageBody() product: ProductInputDTO) {
    this.productsService.create(product);
    this.productsService.findAll().then((products) => {
      this.emitGetEvent(products);
    });
    this.logger.debug(product);
  }
}
