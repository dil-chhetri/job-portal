<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use App\Http\Resources\JobsResource;
use App\Models\Job;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return JobsResource::collection(
            Job::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobRequest $request)
    {
        //
        $data = $request->validated();
        $job = Job::create($data);
        return response(new JobsResource($job),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        //
        return new JobsResource($job);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobRequest $request, Job $job)
    {
        //
        $data = $request->validated();
        $job->update($data);
        return new JobsResource($job);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        //
        $job->delete();
        return response("",204);
    }
}
