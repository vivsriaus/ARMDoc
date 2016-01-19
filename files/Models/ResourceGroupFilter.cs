// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for
// license information.
// 
// Code generated by Microsoft (R) AutoRest Code Generator 0.14.0.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace Microsoft.Azure.Management.Resources.Models
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Newtonsoft.Json;
    using Microsoft.Rest;
    using Microsoft.Rest.Serialization;
    using Microsoft.Rest.Azure;

    /// <summary>
    /// Resource group filter.
    /// </summary>
    public partial class ResourceGroupFilter
    {
        /// <summary>
        /// Initializes a new instance of the ResourceGroupFilter class.
        /// </summary>
        public ResourceGroupFilter() { }

        /// <summary>
        /// Initializes a new instance of the ResourceGroupFilter class.
        /// </summary>
        public ResourceGroupFilter(string tagName = default(string), string tagValue = default(string))
        {
            TagName = tagName;
            TagValue = tagValue;
        }

        /// <summary>
        /// Gets or sets the tag name.
        /// </summary>
        [JsonProperty(PropertyName = "tagName")]
        public string TagName { get; set; }

        /// <summary>
        /// Gets or sets the tag value.
        /// </summary>
        [JsonProperty(PropertyName = "tagValue")]
        public string TagValue { get; set; }

    }
}
