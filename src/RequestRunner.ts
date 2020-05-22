import got, { CancelableRequest, Options, Response } from 'got';

export type IOptionalUrlRequestOptions = Options;
export type IRequestOptions = Options;
export type IResponse<T> = Response<T>;

export interface IRequestRunner {
    run<T>(options: IRequestOptions): Promise<IResponse<T>>;
}

/**
 * Default request runner.
 */
export class DefaultRequestRunner implements IRequestRunner {
    public run<T>(options: IRequestOptions): Promise<IResponse<T>> {
        return (<CancelableRequest>got(options)).json();
    }
}
