import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type AuthResponse = {
    __typename?: "AuthResponse";
    success: Scalars["Boolean"];
    token?: Maybe<Scalars["String"]>;
};

export type Mutation = {
    __typename?: "Mutation";
    createUser?: Maybe<AuthResponse>;
    loginUser?: Maybe<AuthResponse>;
    updateRole?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateUserArgs = {
    email?: InputMaybe<Scalars["String"]>;
    password?: InputMaybe<Scalars["String"]>;
    roles?: InputMaybe<Array<InputMaybe<Role>>>;
};

export type MutationLoginUserArgs = {
    email?: InputMaybe<Scalars["String"]>;
    password?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateRoleArgs = {
    email: Scalars["ID"];
    roles?: InputMaybe<Array<InputMaybe<Role>>>;
};

export type Query = {
    __typename?: "Query";
    searchUsers?: Maybe<Array<Maybe<User>>>;
};

export type QuerySearchUsersArgs = {
    username?: InputMaybe<Scalars["String"]>;
};

export enum Role {
    Admin = "ADMIN",
    Owner = "OWNER",
    User = "USER",
}

export type User = {
    __typename?: "User";
    email: Scalars["String"];
    id: Scalars["ID"];
    password: Scalars["String"];
    roles: Array<Role>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    AuthResponse: ResolverTypeWrapper<AuthResponse>;
    Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
    ID: ResolverTypeWrapper<Scalars["ID"]>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    Role: Role;
    String: ResolverTypeWrapper<Scalars["String"]>;
    User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    AuthResponse: AuthResponse;
    Boolean: Scalars["Boolean"];
    ID: Scalars["ID"];
    Mutation: {};
    Query: {};
    String: Scalars["String"];
    User: User;
}>;

export type AuthDirectiveArgs = {
    allows?: Maybe<Array<Maybe<Role>>>;
};

export type AuthDirectiveResolver<
    Result,
    Parent,
    ContextType = any,
    Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResponseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["AuthResponse"] = ResolversParentTypes["AuthResponse"]
> = ResolversObject<{
    success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
    createUser?: Resolver<
        Maybe<ResolversTypes["AuthResponse"]>,
        ParentType,
        ContextType,
        Partial<MutationCreateUserArgs>
    >;
    loginUser?: Resolver<
        Maybe<ResolversTypes["AuthResponse"]>,
        ParentType,
        ContextType,
        Partial<MutationLoginUserArgs>
    >;
    updateRole?: Resolver<
        Maybe<ResolversTypes["Boolean"]>,
        ParentType,
        ContextType,
        RequireFields<MutationUpdateRoleArgs, "email">
    >;
}>;

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
    searchUsers?: Resolver<
        Maybe<Array<Maybe<ResolversTypes["User"]>>>,
        ParentType,
        ContextType,
        Partial<QuerySearchUsersArgs>
    >;
}>;

export type UserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
    email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    roles?: Resolver<Array<ResolversTypes["Role"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
    AuthResponse?: AuthResponseResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
    auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;
