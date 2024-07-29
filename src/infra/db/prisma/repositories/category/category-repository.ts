import { CategoryModel } from "@/domain/model/category-model";
import { LoadCategoriesRepository } from "@/domain/protocols/infra/db";
import prisma from "../../helpers/client";

export class CategoryRepository implements LoadCategoriesRepository{
    async load(): Promise<CategoryModel[]>{
        const categories = await prisma.category.findMany()
        return categories
    }
}