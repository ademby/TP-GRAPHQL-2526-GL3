import { GraphQLResolveInfo } from 'graphql';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateCvInput = {
  age: Scalars['Int']['input'];
  job: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  skillIds: Array<Scalars['ID']['input']>;
};

export type Cv = {
  __typename?: 'Cv';
  age: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  job: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner: User;
  skills: Array<Skill>;
};

export type CvOperation = {
  __typename?: 'CvOperation';
  cv: Cv;
  operation: OperationType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCv: Cv;
  removeCv: Scalars['Boolean']['output'];
  updateCv: Cv;
};


export type MutationCreateCvArgs = {
  input: CreateCvInput;
};


export type MutationRemoveCvArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCvArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCvInput;
};

export enum OperationType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

export type Query = {
  __typename?: 'Query';
  cv?: Maybe<Cv>;
  cvs: Array<Cv>;
};


export type QueryCvArgs = {
  id: Scalars['ID']['input'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Skill = {
  __typename?: 'Skill';
  designation: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  cvChanged: CvOperation;
};

export type UpdateCvInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  job?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  skillIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  roles: Array<Maybe<Role>>;
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateCvInput: CreateCvInput;
  Cv: ResolverTypeWrapper<Cv>;
  CvOperation: ResolverTypeWrapper<CvOperation>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  OperationType: OperationType;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Role: ResolverTypeWrapper<Role>;
  Skill: ResolverTypeWrapper<Skill>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<Record<PropertyKey, never>>;
  UpdateCvInput: UpdateCvInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateCvInput: CreateCvInput;
  Cv: Cv;
  CvOperation: CvOperation;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Role: Role;
  Skill: Skill;
  String: Scalars['String']['output'];
  Subscription: Record<PropertyKey, never>;
  UpdateCvInput: UpdateCvInput;
  User: User;
};

export type CvResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Cv'] = ResolversParentTypes['Cv']> = {
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  job?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  skills?: Resolver<Array<ResolversTypes['Skill']>, ParentType, ContextType>;
};

export type CvOperationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CvOperation'] = ResolversParentTypes['CvOperation']> = {
  cv?: Resolver<ResolversTypes['Cv'], ParentType, ContextType>;
  operation?: Resolver<ResolversTypes['OperationType'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCv?: Resolver<ResolversTypes['Cv'], ParentType, ContextType, RequireFields<MutationCreateCvArgs, 'input'>>;
  removeCv?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveCvArgs, 'id'>>;
  updateCv?: Resolver<ResolversTypes['Cv'], ParentType, ContextType, RequireFields<MutationUpdateCvArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cv?: Resolver<Maybe<ResolversTypes['Cv']>, ParentType, ContextType, RequireFields<QueryCvArgs, 'id'>>;
  cvs?: Resolver<Array<ResolversTypes['Cv']>, ParentType, ContextType>;
};

export type RoleResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SkillResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Skill'] = ResolversParentTypes['Skill']> = {
  designation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  cvChanged?: SubscriptionResolver<ResolversTypes['CvOperation'], "cvChanged", ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Cv?: CvResolvers<ContextType>;
  CvOperation?: CvOperationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Skill?: SkillResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

