const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

// Пример схемы
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLString }, // Меняем GraphQLInt на GraphQLString
    title: { type: GraphQLString },
    price: { type: GraphQLFloat }, // Оставляем цену как GraphQLFloat, если цена может быть с десятичными знаками
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        // Возвращаем данные о продуктах
        return [
          { id: "1", title: "Ноутбук ASUS", price: 75000 },
          { id: "2", title: "Смартфон Samsung", price: 50000 },
          { id: "3", title: "Кофеварка Philips", price: 12000 },
          { id: "4", title: "Игровая мышь Logitech", price: 5000 },
          { id: "5", title: "Клавиатура механическая", price: 8000 },
          { id: "1740666849582", title: "товар", price: 15 }, // Теперь это строка
        ];
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        title: { type: GraphQLString },
        price: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        // Добавление нового продукта (пример)
        return { id: "6", title: args.title, price: args.price }; // ID как строка
      },
    },
  },
});

// Экспортируем схему
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
