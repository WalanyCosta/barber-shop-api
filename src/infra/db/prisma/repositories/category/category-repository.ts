import { CategoryModel } from "@/domain/model/category-model";
import { LoadCategoriesRepository, LoadCategoryByIdRepository } from "@/domain/protocols/infra/db";
import prisma from "../../helpers/client";

export class CategoryRepository implements LoadCategoriesRepository, LoadCategoryByIdRepository{
    async load(): Promise<CategoryModel[]>{
        const categories = await prisma.category.findMany()
        return categories
    }

    async loadById(id: string): Promise<CategoryModel | null>{
        const category = await prisma.category.findUnique({
            where:{
                id
            }
        })
        return category
    }
}