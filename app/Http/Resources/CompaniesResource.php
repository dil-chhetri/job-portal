<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompaniesResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
           'id' => $this->id,
           'company_name' => $this->company_name,
           'company_type' => $this->company_type,
           'created_at' =>  $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
